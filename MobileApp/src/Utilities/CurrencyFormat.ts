export const FormatBalance = (balance: string) => {
    const formatter = new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
    });
    let newBalance = Number(
        balance.substring(0, balance.length - 2) +
        '.' +
        balance.substring(balance.length - 2),
    );
    return formatter.format(newBalance);
};
