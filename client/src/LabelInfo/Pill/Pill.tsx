import './pill.css';
import React, {useState} from "react";
import Badge from "react-bootstrap/Badge";

interface Props {
    mood: string;
    count: number;
}

const pillMap = new Map<string, string>([
    ["Continuous Mix", "info"],
    ["Crossbreed", "silver"],
    ["Deep Hardstyle", "indigo"],
    ["Doomcore", "silver"],
    ["Downtempo", "silver"],
    ["Early Hardcore", "gold"],
    ["Early Hardstyle", "magenta"],
    ["Euphoric Frenchcore", "yellow"],
    ["Euphoric Hardstyle", "uv"],
    ["Extra Raw Hardstyle", "indigo"],
    ["Freestyle", "white"],
    ["Frenchcore", "yellow"],
    ["Happy Hard", "uv"],
    ["Hard Dance", "orange"],
    ["Hardstyle Classics", "magenta"],
    ["Hardtechno", "orange"],
    ["Hardtek", "green"],
    ["Industrial Hardcore", "silver"],
    ["Jump/Tek", "brown"],
    ["Kickroll Hardstyle", "indigo"],
    ["Mainstream Hardcore", "black"],
    ["Mainstream Hardstyle", "red"],
    ["Melodic Hardcore", "black"],
    ["Nederlandse Hardstyle", "uv"],
    ["Newcomer Hardstyle", "purple"],
    ["PsyStyle", "brown"],
    ["Raw Hardstyle", "blue"],
    ["Subground", "white"],
    ["Terror", "yellow"],
    ["UK Hardcore", "black"],
    ["Uptempo Hardcore", "yellow"]
]);


export default function Pill({mood, count}: Props) {
    return (
        <Badge pill bg={pillMap.get(mood)}
               style={{display: 'inline'}}>{mood}:{count}</Badge>
    );

}
