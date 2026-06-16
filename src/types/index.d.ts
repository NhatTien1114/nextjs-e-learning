type TActiveLinkProps = {
    url: string;
    children: React.ReactNode;
}

type TMenuItems = {
    url: string;
    title: string;
    icon?: React.ReactNode;
}

type TUserParams = {
    clerkId: string,
    username: string,
    email: string,
    name?: string,
    avatar?: string
}

export { TActiveLinkProps, TMenuItems, TUserParams }