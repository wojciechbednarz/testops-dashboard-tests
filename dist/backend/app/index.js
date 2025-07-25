"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testRoutes_1 = __importDefault(require("./routes/testRoutes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
// API routes
app.use('/api/tests', testRoutes_1.default);
// Serve static files (e.g., JS, CSS) from frontend build directory
app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/dist')));
// Serve index.html on root path
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../frontend/dist/index.html'));
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
