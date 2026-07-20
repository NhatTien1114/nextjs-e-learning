import IconDelete from '@/components/icons/IconDelete';
import IconEdit from '@/components/icons/IconEdit';
import { commonClassNames } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { MouseEvent } from 'react'
type TIcon = "edit" | "delete";
const ActionEdit = ({ onClick, icon, url }: { onClick?: (e: MouseEvent<HTMLButtonElement>) => void, icon: TIcon, url?: string }) => {
    return (
        <>
            {url ?
                <Link
                    className={cn(
                        commonClassNames.action
                    )}
                    href={url}
                >
                    <IconEdit />
                </Link>
                :
                <button
                    className={cn(
                        commonClassNames.action
                    )}
                    onClick={onClick}
                    type="submit"
                >
                    {icon === "edit" ? <IconEdit /> : <IconDelete />}
                </button>
            }
        </>
    )
}

export default ActionEdit