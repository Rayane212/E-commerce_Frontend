import { SettingsOptions } from "./settings/SettingsOptions";

export interface HeaderProps {
    title: string;
    link: string;
    isButton: boolean;
    buttonTitle: string;
    isSelect: boolean;
    isRecord: boolean;
    optionsList: Record<string, string> | SettingsOptions;
  }