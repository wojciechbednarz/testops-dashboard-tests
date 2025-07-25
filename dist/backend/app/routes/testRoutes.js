"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testController_1 = require("../controllers/testController");
const router = express_1.default.Router();
router.get('/:id', testController_1.getTest);
router.get('/', testController_1.getTests);
router.post('/', testController_1.triggerTest);
exports.default = router;
