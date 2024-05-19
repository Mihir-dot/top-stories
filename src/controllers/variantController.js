const Variant = require('../models/variantModel');

exports.getAllVariants = async (req, res) => {
    try {
        const variants = await Variant.find().populate('parent');
        res.json(variants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
