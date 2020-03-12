import * as shell from 'shelljs';

// Copy .env to dist
shell.cp( "-R", ".env", "dist/" );
