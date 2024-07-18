const calculatePercentage = (originalPrice: number, discountPrice: number) => {
    const discountAmount = originalPrice - discountPrice;

    const percent = discountAmount / originalPrice * 100

    return parseFloat(percent.toFixed(2))
}


export { calculatePercentage }