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


        IClientServices: Symbol.for('ClientServices'),
        IAreaServices: Symbol.for('AreaServices'),
    },

    REPOSITORIES: {
        IEquipmentPositionRepository: Symbol.for('IEquipmentPositionRepository'),
        IEquipmentRepository: Symbol.for('IEquipmentRepository'),
        IEquipmentsTeethRealTimeRepository: Symbol.for('IEquipmentsTeethRealTimeRepository'),
        ITpsConfigurationRepository: Symbol.for('ITpsConfigurationRepository'),


        IClientRepository: Symbol.for('IClientRepository'),
        IAreaRepository: Symbol.for('IAreaRepository'),
    },

    VALIDATORS: {

    },
};

export { TYPES };
