import i18n from 'i18n';
import { Container } from 'inversify';
import { ILang } from '../lang/lang';
import './controllers';
import {
    IEquipmentPositionRepository,
    IEquipmentPositionServices,
    IEquipmentsTeethRealTimeRepository,
    IEquipmentsTeethRealTimeServices, ITpsConfigurationRepository, ITpsConfigurationServices,
} from './interfaces';
import { SupportLangMiddleware } from './middlewares/support_lang.middleware';
import { EquipmentPositionRepository, EquipmentsTeethRealTimeRepository, TpsConfigurationRepository } from './repositories';
import { EquipmentPositionService, EquipmentsTeethRealTimeServices } from './services';
import { TYPES } from './types';
import { IEquipmentRepository, IEquipmentServices } from './interfaces/equipment.interface';
import { EquipmentService } from './services/equipment.services';
import { EquipmentRepository } from './repositories/equipment.repository';
import { TpsConfigurationServices } from './services/tps_configuration.services';

/**
 * CONTAINER
 */
const container = new Container();

/**
 * MIDDLEWARES:
 */
container.bind<SupportLangMiddleware>(TYPES.MIDDLEWARES.SupportLangMiddleware).to(SupportLangMiddleware);

/***
 * CONSTANTS
 *
 */
container.bind<ILang>(TYPES.LANG).toConstantValue(i18n);

/***
 * SERVICES
 *
 */
container.bind<IEquipmentPositionServices>(TYPES.SERVICES.IEquipmentPositionServices).to(EquipmentPositionService);
container.bind<IEquipmentServices>(TYPES.SERVICES.IEquipmentServices).to(EquipmentService);
container.bind<IEquipmentsTeethRealTimeServices>(TYPES.SERVICES.IEquipmentsTeethRealTimeServices).to(EquipmentsTeethRealTimeServices);
container.bind<ITpsConfigurationServices>(TYPES.SERVICES.ITpsConfigurationServices).to(TpsConfigurationServices);
// container.bind<ILevelLaboursServices>(TYPES.SERVICES.ILevelLaboursServices).to(LevelLaboursServices);
// container.bind<IEquipmentActivityService>(TYPES.SERVICES.IEquipmentActivityService).to(EquipmentActivityService);
// container.bind<IFleetsLabourTypeService>(TYPES.SERVICES.IFleetsLabourTypeService).to(FleetsLabourTypeService);
// container.bind<IScheduleService>(TYPES.SERVICES.IScheduleService).to(ScheduleService);
// container.bind<IAssigmentLabourService>(TYPES.SERVICES.AssigmenteLabourService).to(AssigmentLabourServices);

/***
 * REPOSITORIES
 *
 */
container.bind<IEquipmentPositionRepository>(TYPES.REPOSITORIES.IEquipmentPositionRepository).to(EquipmentPositionRepository);
container.bind<IEquipmentRepository>(TYPES.REPOSITORIES.IEquipmentRepository).to(EquipmentRepository);
container.bind<IEquipmentsTeethRealTimeRepository>(TYPES.REPOSITORIES.IEquipmentsTeethRealTimeRepository).to(EquipmentsTeethRealTimeRepository);
container.bind<ITpsConfigurationRepository>(TYPES.REPOSITORIES.ITpsConfigurationRepository).to(TpsConfigurationRepository);

// container.bind<IActivityEquipmentResourceRepository>(TYPES.REPOSITORIES.IActivityEquipmentResourceRepository).to(ActivityEquipmentResourceRepository);
// container.bind<ICrewScheduleEquipmentRepository>(TYPES.REPOSITORIES.CrewScheduleEquipmentRepository).to(CrewScheduleEquipmentRepository);
// container.bind<IEquipmentRepository>(TYPES.REPOSITORIES.IEquipmentRepository).to(RemoteEquipmentRepository);
// container.bind<IFleetsLabourTypeRepository>(TYPES.REPOSITORIES.IFleetsLabourTypeRepository).to(FleetsLabourTypeRepository);
// container.bind<ILabourRepository>(TYPES.REPOSITORIES.ILabourRepository).to(RemoteLabourRepository);
// container.bind<IZoneLevelRepository>(TYPES.REPOSITORIES.IZoneLevelRepository).to(ZoneLevelRepository);
// container.bind<IScheduleRepository>(TYPES.REPOSITORIES.IScheduleRepository).to(ScheduleRepository);
// container.bind<IAssigmenteLabourRepository>(TYPES.REPOSITORIES.AssigmentLabourRepository).to(AssigmentLabourRepository);
// container.bind<ITasksScheduleRepository>(TYPES.REPOSITORIES.TasksScheduleRepository).to(TasksScheduleRepository);

/***
 * VALIDATORS REQUEST
 *
 */
// container.bind<EquipmentActivityRequestValidator>(TYPES.VALIDATORS.EquipmentsActiviyRequest).to(EquipmentActivityRequestValidator).inSingletonScope();
// container.bind<FleetLabourTypeRequestValidator>(TYPES.VALIDATORS.FleetLabourTypeRequest).to(FleetLabourTypeRequestValidator).inSingletonScope();
// container.bind<ScheduleRequestValidator>(TYPES.VALIDATORS.ScheduleRequest).to(ScheduleRequestValidator).inSingletonScope();
// container.bind<LevelLaboursRequestValidator>(TYPES.VALIDATORS.LevelLaboursRequest).to(LevelLaboursRequestValidator).inSingletonScope();
// container.bind<AssigmentLabourRequestValidator>(TYPES.VALIDATORS.AssigmentLabourRequest).to(AssigmentLabourRequestValidator).inSingletonScope();

export { container };
