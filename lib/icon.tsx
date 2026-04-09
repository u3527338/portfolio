import React from "react";
import { AiFillFileExcel } from "react-icons/ai";
import { FaAws, FaBolt } from "react-icons/fa";
import {
    SiDocker,
    SiExpress,
    SiMongodb,
    SiMysql,
    SiNextdotjs,
    SiPython,
    SiRabbitmq,
    SiReact,
    SiSocketdotio,
    SiTailwindcss,
    SiTypescript,
} from "react-icons/si";

export const IconMap: { [key: string]: React.ReactNode } = {
  SiNextdotjs: <SiNextdotjs />,
  SiReact: <SiReact />,
  SiTypescript: <SiTypescript />,
  SiTailwindcss: <SiTailwindcss />,
  SiPython: <SiPython />,
  SiExpress: <SiExpress />,
  SiSocketdotio: <SiSocketdotio />,
  SiRabbitmq: <SiRabbitmq />,
  SiMysql: <SiMysql />,
  SiMongodb: <SiMongodb />,
  FaAws: <FaAws />,
  SiDocker: <SiDocker />,
  FaBolt: <FaBolt />,
  AiFillFileExcel: <AiFillFileExcel />,
};
