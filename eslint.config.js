import htmlPlugin from 'eslint-plugin-html';

export default [
    {
        files: ['**/*.js', '**/*.html'],
        plugins: {
            html: htmlPlugin
        },
        rules: {
            // HTML 내부 <script>에 대해 JS 룰 적용
        }
    }
];
