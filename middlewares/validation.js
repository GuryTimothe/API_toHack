const { body, param, query, validationResult } = require('express-validator');

const validateMonster = [
    body('name')
        .isLength({ min: 1, max: 100 })
        .withMessage('Le nom doit contenir entre 1 et 100 caractères')
        .escape(),
    body('type')
        .isLength({ min: 1, max: 50 })
        .withMessage('Le type doit contenir entre 1 et 50 caractères')
        .escape()
];

const validateUser = [
    body('username')
        .isLength({ min: 3, max: 30 })
        .withMessage('Le nom d\'utilisateur doit contenir entre 3 et 30 caractères')
        .isAlphanumeric()
        .withMessage('Le nom d\'utilisateur ne doit contenir que des caractères alphanumériques')
        .escape(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Le mot de passe doit contenir au moins 6 caractères')
];


const validateId = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('L\'ID doit être un entier positif')
];


const validatePagination = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('La page doit être un entier positif'),
    query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('La limite doit être entre 1 et 100')
];


const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Données invalides",
            errors: errors.array()
        });
    }
    next();
};

module.exports = {
    validateMonster,
    validateUser,
    validateId,
    validatePagination,
    handleValidationErrors
};