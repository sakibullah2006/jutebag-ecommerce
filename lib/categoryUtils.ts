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
    if (!Array.isArray(categories) || categories.length === 0) {
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

    // Attach children to their parents
    categoryMap.forEach((node) => {
        if (node.parent !== 0) {
            const parentNode = categoryMap.get(node.parent);
            if (parentNode) {
                parentNode.children.push(node);
            }
        }
    });

    // Helper to convert CategoryNode to MenuItem
    const convertNodeToMenuItem = (node: CategoryNode): MenuItem => {
        const menuItem: MenuItem = {
            id: node.id,
            name: node.name,
            slug: node.slug,
        };
        // Add gender-specific labels if needed (optional, keep if used elsewhere)
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

    // Top categories: first_order
    const topCategories = Array.from(categoryMap.values()).filter(
        (cat) => cat.slug.toLowerCase().includes('first_order') && cat.parent === 0
    );

    // Only attach second_order children
    const menu: MenuItem[] = topCategories.map((topCat) => {
        // Only keep children with 'second_order' in slug
        topCat.children = topCat.children.filter(child => child.slug.toLowerCase().includes('second_order'));
        return convertNodeToMenuItem(topCat);
    });

    return menu;
}