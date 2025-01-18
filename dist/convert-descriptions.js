var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
export function convertDescriptions(payload) {
    return __awaiter(this, void 0, void 0, function () {
        var products, _loop_1, _i, products_1, product, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    console.log('Starting description conversion...');
                    return [4 /*yield*/, payload.find({
                            collection: 'products',
                            limit: 1000,
                        })];
                case 1:
                    products = (_b.sent()).docs;
                    console.log("Found ".concat(products.length, " products to process"));
                    _loop_1 = function (product) {
                        var description, html_1, error_2;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    description = product.description;
                                    if (!((_a = description === null || description === void 0 ? void 0 : description.root) === null || _a === void 0 ? void 0 : _a.children)) return [3 /*break*/, 4];
                                    console.log("Converting description for product: ".concat(product.name));
                                    _c.label = 1;
                                case 1:
                                    _c.trys.push([1, 3, , 4]);
                                    html_1 = '';
                                    description.root.children.forEach(function (node) {
                                        if (node.type === 'paragraph' && node.children) {
                                            var text = node.children
                                                .map(function (child) { return child.text || ''; })
                                                .join('');
                                            html_1 += "<p>".concat(text, "</p>");
                                        }
                                    });
                                    return [4 /*yield*/, payload.update({
                                            collection: 'products',
                                            id: product.id,
                                            data: {
                                                description_html: html_1,
                                            },
                                        })];
                                case 2:
                                    _c.sent();
                                    console.log("Successfully updated product: ".concat(product.name));
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_2 = _c.sent();
                                    console.error("Error updating product ".concat(product.name, ":"), error_2);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, products_1 = products;
                    _b.label = 2;
                case 2:
                    if (!(_i < products_1.length)) return [3 /*break*/, 5];
                    product = products_1[_i];
                    return [5 /*yield**/, _loop_1(product)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    console.log('Finished converting descriptions');
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _b.sent();
                    console.error('Error in conversion script:', error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
