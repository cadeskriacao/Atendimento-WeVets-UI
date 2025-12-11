import { useState, useCallback } from 'react';
import { CartItem } from '../domain/models/cart.model';
import { Service } from '../domain/models/service.model';

export function useCart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = useCallback((service: Service, anticipationFee?: number, limitFee?: number) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === service.id);
            if (existing) {
                return prev.map(item =>
                    item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...service, quantity: 1, anticipationFee, limitFee }];
        });
    }, []);

    const updateQuantity = useCallback((id: string, delta: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, quantity: Math.max(1, item.quantity + delta) };
            }
            return item;
        }));
    }, []);

    const removeFromCart = useCallback((id: string) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    }, []);

    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    const total = cartItems.reduce((acc, item) => acc + (item.copay * item.quantity), 0);

    return {
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        total
    };
}
