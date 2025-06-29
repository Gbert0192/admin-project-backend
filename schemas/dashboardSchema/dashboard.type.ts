export interface FormTrendData {
    date: string;
    huawei_count: number;
    kahoot_count: number;
}

export interface FormAttemptStats {
    form_id: number;
    form_title: string;
    total_user_attempts: number;
}

export interface BasicStatistics {
    total_huawei_forms: number;
    total_kahoot_forms: number;
    total_users: number;
    descriptions: {
        huawei_description: string;
        kahoot_description: string;
        users_description: string;
    };
}

export interface FormAttemptStatsResponse {
    huawei_forms: FormAttemptStats[];
    kahoot_forms: FormAttemptStats[];
} 