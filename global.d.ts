declare module 'global' {
    global {
        interface Window {
            lambdatest_action?: {
                updateTestStatus: (status: string) => void;
            };
        }
    }
}

