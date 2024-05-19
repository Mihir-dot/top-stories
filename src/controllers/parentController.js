const Parent = require('../models/parentModel');
const Variant = require('../models/variantModel');

exports.getAllParents = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;

    try {
        const count = await Parent.countDocuments();
        const totalPages = Math.ceil(count / limit);

        const parents = await Parent.find()
            .populate('multimedia')
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({
            totalRecords: count,
            totalPages,
            currentPage: page,
            parents
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.createParent = async (data, res) => {
    const results = data.results;

    try {
        const parentPromises = results.map(async (result) => {
            const { section, subsection, title, abstract, url, uri, byline, item_type, updated_date, created_date, published_date, multimedia } = result;
            const parent = new Parent({
                section, subsection, title, abstract, url, uri, byline, item_type, updated_date, created_date, published_date
            });
            const savedParent = await parent.save();

            // Handle multimedia
            if (multimedia && multimedia.length > 0) {
                for (let media of multimedia) {
                    const variant = new Variant({ ...media, parent: savedParent._id });
                    const savedVariant = await variant.save();
                    savedParent.multimedia.push(savedVariant._id);
                }
                await savedParent.save();
            }

            return savedParent;
        });

        const savedParents = await Promise.all(parentPromises);
        res.status(201).json(results);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
