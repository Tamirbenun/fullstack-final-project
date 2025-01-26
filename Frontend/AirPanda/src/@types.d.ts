import { ReactNode } from "react";

export type FC<T> = (props: T) => ReactNode;

export type FCP = FC<{ children: ReactNode }>;
