export const moneyFormat = (amount) => {
    let formatter = new Intl.NumberFormat().format(amount);

    return formatter;
}