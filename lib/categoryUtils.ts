import { CategorieType } from "../types/data-type";

export interface MenuItem {
    id: number;
    name: string;
    slug: string;
    subMenu?: MenuItem[]; // Sub-menu is optional
    isGenderCat?: boolean; // Optional property
    genderCategory?: 'men' | 'women'; // Optional property
}

type CategoryNode = CategorieType & { children: CategoryNode[] };


export function generateMenuItems(categories: CategorieType[]): MenuItem[] {
    const finalMenu: MenuItem[] = [];
    const fashionCategory = categories.find(
        (cat) => cat.slug === 'first_order_fashion'
    );

    if (!fashionCategory) {
        console.error("The root 'Fashion' category was not found.");
        return [];
    }

    // Filter out "Uncategorized" before processing
    const filteredCategories = categories.filter(
        (cat) => cat.slug !== 'uncategorized'
    );

    const categoryMap = new Map<number, CategoryNode>();

    filteredCategories.forEach((cat) => {
        categoryMap.set(cat.id, { ...cat, children: [] });
    });

    categoryMap.forEach((node) => {
        if (node.parent !== 0) {
            const parentNode = categoryMap.get(node.parent);
            if (parentNode) {
                parentNode.children.push(node);
            }
        }
    });

    /**
     * Helper function to convert a CategoryNode to a MenuItem,
     * adding gender-specific properties where applicable.
     */
    const convertNodeToMenuItem = (node: CategoryNode): MenuItem => {
        const menuItem: MenuItem = {
            id: node.id,
            name: node.name,
            slug: node.slug,
        };

        // ✨ Add gender-specific labels
        if (node.slug === 'second_order_fashion_gender_men') {
            menuItem.isGenderCat = true;
            menuItem.genderCategory = 'men';
        } else if (node.slug === 'second_order_fashion_gender_women') {
            menuItem.isGenderCat = true;
            menuItem.genderCategory = 'women';
        }

        if (node.children.length > 0) {
            menuItem.subMenu = node.children.map(convertNodeToMenuItem);
        }
        return menuItem;
    };

    const fashionNode = categoryMap.get(fashionCategory.id);
    if (fashionNode?.children) {
        const fashionSubMenus = fashionNode.children.map(convertNodeToMenuItem);
        finalMenu.push(...fashionSubMenus);
    }

    categoryMap.forEach((node) => {
        if (node.parent === 0 && node.id !== fashionCategory.id) {
            finalMenu.push(convertNodeToMenuItem(node));
        }
    });

    return finalMenu;
}