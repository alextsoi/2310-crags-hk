"use client";

export default function Copy(props) {
    const { text, value } = props;
    const copyFunction = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(value);
    }
    return <a onClick={copyFunction}>{text}</a>;
}