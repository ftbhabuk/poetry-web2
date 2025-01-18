"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
var config_1 = require("../../config");
var richtext_lexical_1 = require("@payloadcms/richtext-lexical");
// Hook to add the user to the product before saving
var addUser = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var user;
    var req = _b.req, data = _b.data;
    return __generator(this, function (_c) {
        user = req.user;
        return [2 /*return*/, __assign(__assign({}, data), { user: user.id })];
    });
}); };
exports.Products = {
    slug: 'products',
    admin: {
        useAsTitle: 'name',
    },
    labels: {
        singular: 'Content',
        plural: 'Contents',
    },
    access: {
        // Restrict read access
        read: function (_a) {
            var user = _a.req.user;
            if ((user === null || user === void 0 ? void 0 : user.role) === 'admin') {
                return true; // Admins can see all products
            }
            // Regular users can only see their own products
            return {
                user: {
                    equals: user === null || user === void 0 ? void 0 : user.id,
                },
            };
        },
        // Restrict create access
        create: function (_a) {
            var user = _a.req.user;
            return Boolean(user); // All logged-in users can create products
        },
        // Restrict update access
        update: function (_a) {
            var user = _a.req.user;
            if ((user === null || user === void 0 ? void 0 : user.role) === 'admin') {
                return true; // Admins can update any product
            }
            // Regular users can only update their own products
            return {
                user: {
                    equals: user === null || user === void 0 ? void 0 : user.id,
                },
            };
        },
        // Restrict delete access
        delete: function (_a) {
            var user = _a.req.user;
            if ((user === null || user === void 0 ? void 0 : user.role) === 'admin') {
                return true; // Admins can delete any product
            }
            // Regular users can only delete their own products
            return {
                user: {
                    equals: user === null || user === void 0 ? void 0 : user.id,
                },
            };
        },
    },
    hooks: {
        beforeChange: [
            addUser,
            function (args) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            }); },
        ],
    },
    fields: [
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            hasMany: false,
            admin: {
                condition: function () { return false; }, // Hide the field in the admin panel
            },
        },
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            label: 'Content Description',
            type: 'richText',
            editor: (0, richtext_lexical_1.lexicalEditor)({
                features: function (_a) {
                    var defaultFeatures = _a.defaultFeatures;
                    return __spreadArray(__spreadArray([], defaultFeatures, true), [
                        (0, richtext_lexical_1.HTMLConverterFeature)({}),
                    ], false);
                },
            }),
        },
        (0, richtext_lexical_1.lexicalHTML)('description', { name: 'description_html' }),
        {
            name: 'author',
            label: 'Author',
            type: 'text',
            required: true,
        },
        {
            name: 'category',
            label: ' Content Category',
            type: 'select',
            options: config_1.PRODUCT_CATEGORIES.map(function (_a) {
                var label = _a.label, value = _a.value;
                return ({ label: label, value: value });
            }),
            required: true,
        },
        {
            name: 'themes',
            label: 'Content Themes',
            type: 'select',
            hasMany: true,
            options: config_1.PRODUCT_THEMES.map(function(_a) {
                var label = _a.label, value = _a.value;
                return ({ label: label, value: value });
            }),
            required: true,
            admin: {
                description: 'Select one or more themes that best describe your content'
            }
        },
        // added myself manually lol
        {
            name: 'context',
            label: 'Written Context',
            type: 'text',
            
          },
          {
            name: 'quote',
            label: 'quote',
            type: 'text',
            required: true,
          },
        {
            name: 'approvedForSale',
            label: 'Content Status',
            type: 'select',
            defaultValue: 'pending',
            access: {
                create: function (_a) {
                    var req = _a.req;
                    return req.user.role === 'admin';
                },
                // changing to let know general users of their contnet status
                read: function () { return true; },
                // read: ({ req }) => req.user.role === 'admin',
                update: function (_a) {
                    var req = _a.req;
                    return req.user.role === 'admin';
                },
            },
            options: [
                {
                    label: 'Pending verification',
                    value: 'pending',
                },
                {
                    label: 'Approved',
                    value: 'approved',
                },
                {
                    label: 'Denied',
                    value: 'denied',
                },
            ],
            // noo this wont even show status for general users 
            // admin: {
            //   condition: ({ user }) => user.role === 'admin', // Only allow editing for admins
            // },
        },
        {
            name: 'images',
            type: 'array',
            label: 'Content Images',
            minRows: 1,
            maxRows: 4,
            required: true,
            labels: {
                singular: 'Image',
                plural: 'Images',
            },
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ],
        },
    ],
};
