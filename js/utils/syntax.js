/* ── Lightweight Python Syntax Highlighter ── */
/* Tokenize-first approach to avoid regex conflicts */
const SyntaxHighlighter = {
    keywords: new Set(['import', 'from', 'as', 'def', 'class', 'return', 'if', 'elif', 'else',
        'for', 'while', 'in', 'not', 'and', 'or', 'is', 'with', 'try', 'except',
        'finally', 'raise', 'pass', 'break', 'continue', 'lambda', 'yield', 'del',
        'global', 'nonlocal', 'assert']),
    builtins: new Set(['print', 'len', 'range', 'type', 'int', 'float', 'str', 'list',
        'dict', 'tuple', 'set', 'bool', 'input', 'enumerate', 'zip', 'map',
        'filter', 'sorted', 'abs', 'round', 'sum', 'min', 'max', 'open', 'isinstance']),
    constants: new Set(['None', 'True', 'False']),

    highlight(code) {
        // Tokenize the code, then wrap each token in a span
        const tokens = this._tokenize(code);
        return tokens.map(t => {
            const text = this._escapeHtml(t.value);
            if (t.type === 'plain') return text;
            return `<span class="token-${t.type}">${text}</span>`;
        }).join('');
    },

    _tokenize(code) {
        const tokens = [];
        let i = 0;
        const len = code.length;

        while (i < len) {
            // Comments
            if (code[i] === '#') {
                let end = code.indexOf('\n', i);
                if (end === -1) end = len;
                tokens.push({ type: 'comment', value: code.slice(i, end) });
                i = end;
                continue;
            }

            // Strings (triple quotes)
            if (code.slice(i, i + 3) === '"""' || code.slice(i, i + 3) === "'''") {
                const q = code.slice(i, i + 3);
                let end = code.indexOf(q, i + 3);
                end = end === -1 ? len : end + 3;
                tokens.push({ type: 'string', value: code.slice(i, end) });
                i = end;
                continue;
            }

            // Strings (single/double quotes)
            if (code[i] === '"' || code[i] === "'") {
                const q = code[i];
                let j = i + 1;
                while (j < len && code[j] !== q) {
                    if (code[j] === '\\') j++; // skip escaped char
                    j++;
                }
                j = Math.min(j + 1, len);
                tokens.push({ type: 'string', value: code.slice(i, j) });
                i = j;
                continue;
            }

            // Numbers
            if (/\d/.test(code[i]) && (i === 0 || /[\s([\-+*/%=,:<>!&|^~{]/.test(code[i - 1]))) {
                let j = i;
                while (j < len && /[\d.]/.test(code[j])) j++;
                tokens.push({ type: 'number', value: code.slice(i, j) });
                i = j;
                continue;
            }

            // Identifiers / keywords
            if (/[a-zA-Z_]/.test(code[i])) {
                let j = i;
                while (j < len && /[a-zA-Z0-9_]/.test(code[j])) j++;
                const word = code.slice(i, j);
                if (this.keywords.has(word)) {
                    tokens.push({ type: 'keyword', value: word });
                } else if (this.builtins.has(word)) {
                    tokens.push({ type: 'builtin', value: word });
                } else if (this.constants.has(word)) {
                    tokens.push({ type: 'number', value: word }); // color constants like numbers
                } else if (j < len && code[j] === '(') {
                    tokens.push({ type: 'function', value: word });
                } else {
                    tokens.push({ type: 'plain', value: word });
                }
                i = j;
                continue;
            }

            // Decorators
            if (code[i] === '@' && /[a-zA-Z_]/.test(code[i + 1] || '')) {
                let j = i + 1;
                while (j < len && /[a-zA-Z0-9_]/.test(code[j])) j++;
                tokens.push({ type: 'decorator', value: code.slice(i, j) });
                i = j;
                continue;
            }

            // Operators
            if ('+-*/%=!<>&|^~'.includes(code[i])) {
                let j = i;
                while (j < len && '+-*/%=!<>&|^~'.includes(code[j])) j++;
                tokens.push({ type: 'operator', value: code.slice(i, j) });
                i = j;
                continue;
            }

            // Newlines (preserve them)
            if (code[i] === '\n') {
                tokens.push({ type: 'plain', value: '\n' });
                i++;
                continue;
            }

            // Everything else (punctuation, whitespace)
            tokens.push({ type: 'plain', value: code[i] });
            i++;
        }

        return tokens;
    },

    _escapeHtml(text) {
        return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
};
