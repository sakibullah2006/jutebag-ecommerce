import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const useSubMenuDepartment = () => {
    const [openSubMenuDepartment, setOpenSubMenuDepartment] = useState(false)
    const pathName = usePathname()

    useEffect(() => {
        if (pathName === '/') {
            setOpenSubMenuDepartment(true)
        } else if (pathName !== '/') {
            setOpenSubMenuDepartment(false)
        }
    }, [pathName])


    const handleSubMenuDepartment = () => {
        setOpenSubMenuDepartment((toggleOpen) => !toggleOpen)
    }

    return {
        openSubMenuDepartment,
        handleSubMenuDepartment,
    }
}

export default useSubMenuDepartment
