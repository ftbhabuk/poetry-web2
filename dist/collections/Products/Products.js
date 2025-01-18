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
import { PRODUCT_CATEGORIES, PRODUCT_THEMES } from '../../config';
import { lexicalEditor, HTMLConverterFeature } from '@payloadcms/richtext-lexical';
var addUser = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var user;
    var req = _b.req, data = _b.data;
    return __generator(this, function (_c) {
        user = req.user;
        return [2 /*return*/, __assign(__assign({}, data), { user: user.id })];
    });
}); };
var countWordsInRichText = function (content) {
    var _a;
    if (!content || typeof content !== 'object')
        return 0;
    if (content.html) {
        var strippedHtml = content.html.replace(/<[^>]*>/g, ' ');
        return strippedHtml.trim().split(/\s+/).filter(Boolean).length;
    }
    if (!((_a = content === null || content === void 0 ? void 0 : content.root) === null || _a === void 0 ? void 0 : _a.children))
        return 0;
    var extractTextFromNode = function (node) {
        if (typeof node === 'string')
            return node;
        if (typeof (node === null || node === void 0 ? void 0 : node.text) === 'string')
            return node.text;
        if (Array.isArray(node === null || node === void 0 ? void 0 : node.children)) {
            return node.children.map(extractTextFromNode).join(' ');
        }
        return '';
    };
    var text = content.root.children.map(extractTextFromNode).join(' ');
    return text.trim().split(/\s+/).filter(Boolean).length;
};
var updateFieldsBeforeChange = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var data = _b.data, operation = _b.operation;
    return __generator(this, function (_c) {
        // Update word count if description exists
        if (data.description) {
            data.descriptionWordCount = countWordsInRichText(data.description);
        }
        // Set or update publishedDate
        if (operation === 'create' || !data.publishedDate) {
            data.publishedDate = new Date().toISOString();
        }
        return [2 /*return*/, data];
    });
}); };
export var Products = {
    slug: 'products',
    admin: {
        useAsTitle: 'name',
    },
    labels: {
        singular: 'Content',
        plural: 'Contents',
    },
    access: {
        read: function (_a) {
            var user = _a.req.user;
            if ((user === null || user === void 0 ? void 0 : user.role) === 'admin')
                return true;
            return {
                user: {
                    equals: user === null || user === void 0 ? void 0 : user.id,
                },
            };
        },
        create: function (_a) {
            var user = _a.req.user;
            return Boolean(user);
        },
        update: function (_a) {
            var user = _a.req.user;
            if ((user === null || user === void 0 ? void 0 : user.role) === 'admin')
                return true;
            return {
                user: {
                    equals: user === null || user === void 0 ? void 0 : user.id,
                },
            };
        },
        delete: function (_a) {
            var user = _a.req.user;
            if ((user === null || user === void 0 ? void 0 : user.role) === 'admin')
                return true;
            return {
                user: {
                    equals: user === null || user === void 0 ? void 0 : user.id,
                },
            };
        },
    },
    hooks: {
        beforeChange: [addUser, updateFieldsBeforeChange],
    },
    fields: [
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            hasMany: false,
            admin: {
                condition: function () { return false; },
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
            editor: lexicalEditor({
                features: function (_a) {
                    var defaultFeatures = _a.defaultFeatures;
                    return __spreadArray(__spreadArray([], defaultFeatures, true), [
                        HTMLConverterFeature({}),
                    ], false);
                },
            }),
        },
        {
            name: 'descriptionWordCount',
            label: 'Description Word Count',
            type: 'number',
            admin: {
                readOnly: true,
                hidden: false,
                description: 'Automatically calculated word count',
            },
        },
        {
            name: 'description_html',
            type: 'textarea',
            admin: {
                hidden: true,
            },
            // 
            // 
        },
        {
            name: 'author',
            label: 'Author',
            type: 'text',
            required: true,
        },
        {
            name: 'category',
            label: 'Content Category',
            type: 'select',
            options: PRODUCT_CATEGORIES.map(function (_a) {
                var label = _a.label, value = _a.value;
                return ({ label: label, value: value });
            }),
            required: true,
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
            name: 'context',
            label: 'Written Context',
            type: 'text',
        },
        {
            name: 'themes',
            label: 'Content Themes',
            type: 'select',
            hasMany: true,
            options: PRODUCT_THEMES.map(function (_a) {
                var label = _a.label, value = _a.value;
                return ({ label: label, value: value });
            }),
            required: true,
            admin: {
                description: 'Select one or more themes that best describe your content'
            }
        },
        {
            name: 'excerpt',
            type: 'textarea',
            maxLength: 200
        },
        {
            name: 'publishedDate',
            type: 'date',
            admin: {
                readOnly: true,
                description: 'Automatically set on creation and updates'
            }
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
                read: function () { return true; },
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
