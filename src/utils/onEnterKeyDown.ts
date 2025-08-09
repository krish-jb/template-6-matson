const onEnterKeyDown = <T extends HTMLElement>(
    e: React.KeyboardEvent<T>,
    callback: () => void,
) => {
    if (e.key === "Enter" || e.code === "Enter") {
        e.stopPropagation();
        callback();
    }
};

export default onEnterKeyDown;
