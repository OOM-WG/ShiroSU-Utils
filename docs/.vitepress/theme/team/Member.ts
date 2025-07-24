export interface Member {
    name: string;
    qq: number;
    avatarPic?: string;
    title: string;
    company?: string;
    companyLink?: string;
    projects: Link[];
    location: string;
    languages: string[];
    website?: Link;
    socials: Socials;
    sponsor?: boolean | string;
    reposPersonal?: string[];
}

export interface Link {
    label: string;
    url: string;
}

export interface Socials {
    github?: string;
    x?: string;
    twitter?: string;
    linkedin?: string;
    codepen?: string;
    bilibili?: string;

    [x: string]: unknown;
}
