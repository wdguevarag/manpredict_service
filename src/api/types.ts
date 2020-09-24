const TYPES = {
    MIDDLEWARES: {
        SupportLangMiddleware: Symbol.for('SupportLangMiddleware'),
    },

    LANG: Symbol.for('Lang'),

    SERVICES: {
        IEquipmentPositionServices: Symbol.for('IEquipmentPositionServices'),
        IEquipmentServices: Symbol.for('IEquipmentServices'),
        IEquipmentsTeethRealTimeServices: Symbol.for('EquipmentsTeethRealTimeServices'),
        ITpsConfigurationServices: Symbol.for('TpsConfigurationServices'),
    },

    REPOSITORIES: {
        IEquipmentPositionRepository: Symbol.for('IEquipmentPositionRepository'),
        IEquipmentRepository: Symbol.for('IEquipmentRepository'),
        IEquipmentsTeethRealTimeRepository: Symbol.for('IEquipmentsTeethRealTimeRepository'),
        ITpsConfigurationRepository: Symbol.for('ITpsConfigurationRepository'),
    },

    VALIDATORS: {

    },
};

export { TYPES };
