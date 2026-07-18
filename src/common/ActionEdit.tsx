import IconDelete from '@/components/icons/IconDelete';
import IconEdit from '@/components/icons/IconEdit';
import { commonClassNames } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'
type TIcon = "edit" | "delete";
const ActionEdit = ({ onClick, icon, url }: { onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void, icon: TIcon, url?: string }) => {
    return (
        <>
            {url &&
                <Link
                    className={cn(
                        commonClassNames.action
                    )}
                    href={url}
                >
                    <IconEdit />
                </Link>
            }
            <span
                className={cn(
                    commonClassNames.action
                )}
                onClick={onClick}
            >
                {icon === "edit" ? <IconEdit /> : <IconDelete />}
            </span>
        </>
    )
}

export default ActionEdit