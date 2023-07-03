// Hero's are smaller size and are included with the build
import ADFHero from '../assets/Images/Apple_Green.png'
import Dr3aminHero from '../assets/Images/Teal.png'
import XdentityHero from '../assets/Images/Global.png'

const listings = {
    ADF: {
        name: 'ADF Collection: Prosperity',
        description: '',
        hero: ADFHero,
        products: [
            {
                id: '1',
                clothingType: 'Sweatshirt',
                sizes: [
                    { name: 'S', price: 29.99 },
                    { name: 'M', price: 29.99 },
                    { name: 'L', price: 34.99 },
                    { name: 'XL', price: 38.99 },
                    { name: 'XXL', price: 45.99 },
                    { name: 'XXXL', price: 49.99 },
                ],
                colors: [
                    { name: 'Apple Green', image: '/listings/ADF/Crewneck_Sweatshirt/Apple_Green.png' },
                    { name: 'Mightnight Navy', image: '/listings/ADF/Crewneck_Sweatshirt/Midnight_Navy.png' },
                    { name: 'Military Green', image: '/listings/ADF/Crewneck_Sweatshirt/Military_Green.png' },
                    { name: 'Plum', image: '/listings/ADF/Crewneck_Sweatshirt/Plum.png' },
                ]
            },
            {
                id: '2',
                clothingType: 'Crewneck Tee',
                sizes: [
                    { name: 'S', price: 19.99 },
                    { name: 'M', price: 19.99 },
                    { name: 'L', price: 19.99 },
                ],
                colors: [
                    { name: 'Black', image: '/listings/ADF/Crewneck_Tee/Black.png' },
                    { name: 'Cool Blue', image: '/listings/ADF/Crewneck_Tee/Cool_Blue.png' },
                    { name: 'Maroon', image: '/listings/ADF/Crewneck_Tee/Maroon.png' },
                ]
            },
            {
                id: '3',
                clothingType: 'Pullover Hoodie',
                sizes: [
                    { name: 'S', price: 39.99 },
                    { name: 'M', price: 39.99 },
                    { name: 'L', price: 39.99 },
                    { name: 'XL', price: 44.99 },
                    { name: 'XXL', price: 44.99 },
                    { name: 'XXXL', price: 49.99 },
                ],
                colors: [
                    { name: 'Black', image: '/listings/ADF/Pullover_Hoodie/Black.png' },
                    { name: 'Gold', image: '/listings/ADF/Pullover_Hoodie/Gold.png' },
                    { name: 'Lilac', image: '/listings/ADF/Pullover_Hoodie/Lilac.png' },
                ]
            },
            // Add more products with their respective metadata, sizes, colors, and image source links
        ]
    },
    Dr3amin: {
        name: 'Dr3amin Collection: Stroked',
        description: '',
        hero: Dr3aminHero,
        products: [
            {
                id: '1',
                clothingType: 'Crewneck Sweatshirt',
                sizes: [
                    { name: 'S', price: 29.99 },
                    { name: 'M', price: 29.99 },
                    { name: 'L', price: 29.99 },
                    { name: 'XL', price: 34.99 },
                    { name: 'XXL', price: 34.99 },
                    { name: 'XXXL', price: 39.99 },
                ],
                colors: [
                    { name: 'Indigo', image: '/listings/Dr3amin/Crewneck_Sweatshirt/Indigo.png' },
                    { name: 'Light Olive', image: '/listings/Dr3amin/Crewneck_Sweatshirt/Light_Olive.png' },
                    { name: 'Lila Blue', image: '/listings/Dr3amin/Crewneck_Sweatshirt/Lila_Blue.png' },
                    { name: 'Maroon', image: '/listings/Dr3amin/Crewneck_Sweatshirt/Maroon.png' },
                    { name: 'Teal', image: '/listings/Dr3amin/Crewneck_Sweatshirt/Teal.png' },
                ]
            },
            {
                id: '2',
                clothingType: "CryberX Case",
                sizes: [
                    { name: 'iPhone 7', price: 14.99 },
                    { name: 'iPhone 7 Plus', price: 14.99 },
                    { name: 'iPhone 8', price: 14.99 },
                    { name: 'iPhone 8 Plus', price: 14.99 },
                    { name: 'iPhone X', price: 14.99 },
                    { name: 'iPhone XR', price: 14.99 },
                    { name: 'iPhone XS', price: 14.99 },
                    { name: 'iPhone 11', price: 14.99 },
                    { name: 'iPhone 11 PRO', price: 14.99 },
                ],
                colors: [
                    { name: 'Global', image: '/listings/Dr3amin/Cases/Global.png' }
                ]
            },
            // Add more products with their respective metadata, sizes, colors, and image source links
        ]
    },
    Xdentity: {
        name: 'Xdentity Collection: MrRobot',
        description: '',
        hero: XdentityHero,
        products: [
            {
                id: '1',
                clothingType: "Xdentity Case",
                sizes: [
                    { name: 'iPhone 7', price: 14.99 },
                    { name: 'iPhone 7 Plus', price: 14.99 },
                    { name: 'iPhone 8', price: 14.99 },
                    { name: 'iPhone 8 Plus', price: 14.99 },
                    { name: 'iPhone X', price: 14.99 },
                    { name: 'iPhone XR', price: 14.99 },
                    { name: 'iPhone XS', price: 14.99 },
                    { name: 'iPhone 11', price: 14.99 },
                    { name: 'iPhone 11 PRO', price: 14.99 },
                ],
                colors: [
                    { name: 'Global', image: '/listings/Xdentity/Cases/Global.png' }
                ]
            },
            // Add more products with their respective metadata, sizes, colors, and image source links
        ]
    }
};


export default listings;