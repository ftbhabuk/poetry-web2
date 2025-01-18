import { useEffect } from "react";
export var useOnClickOutside = function (ref, handler) {
    useEffect(function () {
        var listener = function (event) {
            var el = ref === null || ref === void 0 ? void 0 : ref.current;
            if (!el || el.contains((event === null || event === void 0 ? void 0 : event.target) || null)) {
                return;
            }
            handler(event); // Call the handler only if the click is outside of the element passed.
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return function () {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]); // Reload only if ref or handler changes
};
