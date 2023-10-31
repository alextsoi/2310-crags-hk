"use client";
import images from '@/app/data/images.json';
import { useEffect, useState } from 'react';

function getSmallerSizeImage(path) {
    return '/images-resized' + path;
}
function getNormalSizeImage(path) {
    return '/images' + path;
}
function getWidthFromPath(path) {
    try {
        // there is a file pattern in the path -w{width}w.jpg
        const width = path.match(/-w(\d+)w/)[1];
        if (!width) return '1920w'
        return width + 'w';
    } catch (e) {
        return '1920w';
    }
}

export default function Image(props) {
    const { path, alt } = props;
    return <img src={getSmallerSizeImage(path)} srcSet={
        getSmallerSizeImage(path) + ' 960w, ' +
        getNormalSizeImage(path) + ' ' + getWidthFromPath(path)
    } alt={alt} />
}