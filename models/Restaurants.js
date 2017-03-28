/**
 * Created by jefferson.wu on 3/1/17.
 */

// SCHEMA for Restaurants and their menus.
// model it out in JS first before building a schema.

var restaurant = {
    name: 'Cha Cha Chicken',
    address: {
        street: '1906 Ocean Ave',
        city: 'Santa Monica',
        state: 'CA',
        zip: 90405
    },
    phone_number: '3105811684',
    website_url: 'http://chachachicken.com',
    menu: {
        categories: [
            {
                name: 'Entrees',
                description: '** Served with two side orders. ',
                items: [
                    {
                        name: 'Cha Cha Chicken',
                        description: '(mild medium or hot) oven roasted chicken smothered in a delicately spiced jamaican jerk sauce. medium spiced sauce is just right!',
                        designator: '**',
                        price: 10.95
                    },
                    {
                        name: 'Coconut Fried Chicken',
                        description: 'crispy coconut battered chicken served with sweet mango sauce and jerk dipping sauces',
                        designator: '**',
                        price: 11.50
                    },
                    {
                        name: 'Ropa Nueva',
                        description: 'shredded chicken breast on a bed of simmering garden veggies.',
                        designator: '**',
                        price: 9.50
                    },
                    {
                        name: 'Arroz No Pollo',
                        description: 'spanish style, vegetable stew w/ rice. (vegetarian)',
                        designator: '**',
                        price: 9.00
                    },
                    {
                        name: 'Spicy Jerked Wings',
                        description: 'coconut battered chicken wings smothered in our sweet spicy pineapple mango jerk sauce.',
                        designator: '**',
                        price: 15.50
                    },
                    {
                        name: 'Jerk Chicken Enchiladas',
                        description: 'our signature jamaican style chicken breast enchiladas smothered in our sweet spicy mango pineapple jerk sauce.',
                        designator: '**',
                        price: 9.50
                    },
                    {
                        name: 'Spinach Quesadilla',
                        description: 'fresh spinach, tomato and bell pepper sautéed in mango sauce, inside a crispy flour tortilla with cheese. (served w/ dirty rice & black beans, jerk sauce & sour cream on the side',
                        designator: '',
                        price: 6.50
                    },
                    {
                        name: 'Ropa Vieja',
                        description: 'slow cooked shredded skirt steak in a complex red garlic onion sauce with dirty rice & black beans, fried plantains and tortillas.',
                        designator: '',
                        price: 9.75
                    },
                    {
                        name: 'Spicy Black Pepper Shrimp',
                        description: 'plump tiger prawns sautéed with pineapple and garlic and reduced in our sweet spicy jerk sauce. (served with dirty rice & black beans, plantains & red cabbage slaw)',
                        designator: '',
                        price: 0.00
                    },
                    {
                        name: 'Jerk Chicken Tostadas',
                        description: '2 crunchy tortillas topped with rice & black beans, lettuce, shredded chicken breast, jerk sauce and cheese.',
                        designator: '',
                        price: 9.25
                    },
                    {
                        name: 'Jerk Combo',
                        description: 'one jerk chicken enchilada, one jerk chicken tostada and fried plantains w/ sour cream.',
                        designator: '',
                        price: 9.75
                    },
                    {
                        name: 'Guizo De Puerco',
                        description: 'red garlic onion pork stew (served w/ dirty rice & fried plantains)',
                        designator: '',
                        price: 9.75
                    }
                ]
            },
            {
                name: 'Sandwiches, Wraps, Soups & Salads',
                description: '',
                items: [
                    {
                        name: 'Mulato Cubano',
                        description: 'shredded chicken breast, cheese, lettuce, pickles and mustard pressed on a crispy cuban baguette',
                        designator: '',
                        price: 9.25
                    },
                    {
                        name: 'Jerk Turkey Or Beef Burger',
                        description: 'jamaican style grilled turkey or beef patty, smothered in jerk sauce w/ cheese, served with grilled onions, romaine lettuce, tomatoes, pickles and mustard, w/ our delicious crispy cuban spicy fries.',
                        designator: '',
                        price: 9.50
                    },
                    {
                        name: 'Ricky\'s Wrap',
                        description: 'shredded chicken breast, dirty rice & black beans, vegetables & lettuce, rolled on lavash flat bread, served w jerk sauce on the side.',
                        designator: '',
                        price: 9.25
                    },
                    {
                        name: 'Jerk Veggie Wrap',
                        description: 'garden veggies, dirty rice, lettuce rolled on warm lavash flat bread.',
                        designator: '',
                        price: 9.00
                    },
                    {
                        name: 'Black Bean Soup',
                        description: 'a flavorful puree of spiced black beans with fresh diced tomatoes, crispy corn strips and a dollop of sour cream.',
                        designator: '',
                        price: 9.00
                    },
                    {
                        name: 'Chicken Gumbo Soup',
                        description: 'spanish style chicken gumbo served with a home baked corn muffin.',
                        designator: '',
                        price: 9.50
                    },
                    {
                        name: 'China & Latina',
                        description: 'chopped fresh lettuce, red cabbage, hearts of palm, pineapple chunks, coconut shavings, and sesame seed, tossed in a sweet asian dijon honey vinaigrette w/ chicken breast, served w/ a corn muffin.',
                        designator: '',
                        price: 9.75
                    },
                    {
                        name: 'Caesar Salad',
                        description: '',
                        designator: '',
                        price: 8.75
                    }
                ]
            },
            {
                name: 'Side Orders',
                description: 'Fried Plantains * Dirty Rice & Black Beans * Spicy Cuban Fries * Red',
                items: [
                    {
                        name: 'Side Order',
                        description: '',
                        designator: '',
                        price: 3.25
                    },
                    {
                        name: 'Side Combo With Corn Muffin',
                        description: '',
                        designator: '',
                        price: 7.75
                    },
                    {
                        name: 'Side Order Of Shredded Chicken Breast',
                        description: '',
                        designator: '',
                        price: 4.95
                    },
                    {
                        name: 'One Jerk Chicken Enchilada',
                        description: '',
                        designator: '',
                        price: 3.25
                    },
                    {
                        name: 'Extra Jerk Sauce',
                        description: '',
                        designator: '',
                        price: 0.50
                    },
                    {
                        name: 'Spiced Sour Cream',
                        description: '',
                        designator: '',
                        price: 0.50
                    },
                    {
                        name: 'Corn Muffins',
                        description: '',
                        designator: '',
                        price: 0.50
                    }
                ]
            },
            {
                name: 'Beverages',
                description: '',
                items: [
                    {
                        name: 'Imported Jamaican Sodas',
                        description: 'ginger beer, ting (grapefruit soda), pineapple, orange, kola champagne.',
                        designator: '',
                        price: 3.00
                    },
                    {
                        name: 'Aguas Frescas (Seasonal Fresh Fruit Waters)',
                        description: 'mango-guava, watermelon, cantaloupe, fresh squeezed lemonade, and home brewed tropical iced tea try our fresh lemonade with a splash of our iced tea!',
                        designator: '',
                        price: 3.00
                    },
                    {
                        name: 'Fountain Sodas',
                        description: 'coca cola, diet coke sprite, barq\'s root beer, and orange fanta',
                        designator: '',
                        price: 2.50
                    },
                    {
                        name: 'Bottled Water',
                        description: '',
                        designator: '',
                        price: 0.00
                    },
                    {
                        name: 'Perrier',
                        description: '',
                        designator: '',
                        price: 0.00
                    },
                    {
                        name: '',
                        description: '',
                        designator: '',
                        price: 0.00
                    }

                ]
            },
            {
                name: 'Dessert',
                description: '',
                items: [
                    {
                        name: 'Homemade Flan Cubano',
                        description: 'served with fresh berries',
                        designator: '',
                        price: 3.00
                    }
                ]
            }
        ]
    }
};


