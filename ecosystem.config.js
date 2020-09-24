module.exports = {
    apps: [
        {
            name: 'am_tps_service',
            script: './dist/index.js',
            out_file: './logs/out.log',
            error_file: './logs/errs.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS Z',
            env: {
                NODE_ENV: 'production',
                URL: '127.0.0.1',
                PORT: 8010,
                SKIP_PREFLIGHT_CHECK: true,
                HOST_DATABASE: '127.0.0.1',
                PORT_DATABASE: 5432,
                USER_DATABASE: 'controlhealth',
                NAME_DATABASE: 'HealthSenseDB',
                PASS_DATABASE: '12345',
                SOCKET_URL: '127.0.0.1',
                SOCKET_PORT: 8100,
                SOCKET_ID: 'health_equipment_socket',
                SOCKET_SERVICE: 'messages',
            },
        },
    ],
};
