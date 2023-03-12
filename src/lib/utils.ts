export const truncateHash = (hash: string) => {
    return hash.substring(0, 4) + '...' + hash.substring(hash.length - 4);
};

export const getPlanName = (amount: number) => {
    let name = 'uncn';
    switch (amount) {
        case 10:
            name = 'Free';
            break;
        case 36:
            name = 'Happy Camper';
            break;
        case 150:
            name = 'Digital Nomad';
            break;
        case 360:
            name = 'High Flyer';
            break;

        default:
            break;
    }

    return name;
};
