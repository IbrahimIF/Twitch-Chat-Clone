/*
import { faker } from '@faker-js/faker';
import { Badge, MessageModel } from './models';

export const generateFakeMessage = (): MessageModel => {
    const generateLightColor = (): string => {
        const hue = Math.floor(Math.random() * 360);
        return faker.color.rgb({ format: 'css', hue, luminosity: 'light' });
    };

    return {
        id: faker.string.uuid(),
        author: {
            rgbColor: generateLightColor(),
            username: faker.internet.userName(),
            badges: generateRandomBadges(),
        },
        content: faker.lorem.sentence(),
    };
};

const generateRandomBadges = (): Badge[] => {
    const badge = (badge: Badge, prob: number) =>
        faker.helpers.maybe(() => badge, { probability: prob });

    return [
        badge('vip', 0.1),
        badge('moderator', 0.1),
        badge('prime', 0.1),
        badge('turbo', 0.1),
    ].filter((x) => x !== undefined) as Badge[];
};
*/