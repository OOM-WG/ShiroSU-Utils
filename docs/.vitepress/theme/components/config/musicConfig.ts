// 音乐播放器配置文件
export interface MusicTrack {
    title: string;
    artist: string;
    url: string;
    cover: string;
    duration?: number;
    album?: string;
}

export interface MusicConfig {
    // 播放列表
    playlist: MusicTrack[];

    // 播放器设置
    settings: {
        // 默认音量 (0-100)
        defaultVolume: number;

        // 是否自动播放下一首
        autoPlayNext: boolean;

        // 是否循环播放
        loop: boolean;

        // 是否随机播放
        shuffle: boolean;

        // 鼠标悬停展开延迟 (毫秒)
        hoverExpandDelay: number;

        // 鼠标离开收起延迟 (毫秒)
        hoverCollapseDelay: number;

        // 是否显示歌词
        showLyrics: boolean;

        // 预加载下一首歌曲
        preloadNext: boolean;
    };

    // 主题配置
    theme: {
        // 主要颜色
        primaryColor: string;

        // 背景透明度 (0-1)
        backgroundOpacity: number;

        // 模糊强度 (像素)
        blurIntensity: number;

        // 圆角大小 (像素)
        borderRadius: number;

        // 阴影强度
        shadowIntensity: "light" | "medium" | "strong";
    };
}

// 默认音乐配置
export const defaultMusicConfig: MusicConfig = {
    playlist: [
        {
            title: "Serenity",
            artist: "Ambient Dreams",
            url: "/assets/music/Bande-annonce.mp3",
            cover: "/assets/music/1.png",
            album: "Peaceful Moments",
            duration: 68,
        }
    ],

    settings: {
        defaultVolume: 50,
        autoPlayNext: true,
        loop: false,
        shuffle: false,
        hoverExpandDelay: 200,
        hoverCollapseDelay: 300,
        showLyrics: false,
        preloadNext: true,
    },

    theme: {
        primaryColor: "#4f46e5",
        backgroundOpacity: 0.95,
        blurIntensity: 10,
        borderRadius: 12,
        shadowIntensity: "medium",
    },
};

// 音乐配置管理器
export class MusicConfigManager {
    private static instance: MusicConfigManager;
    private config: MusicConfig;

    private constructor() {
        this.config = { ...defaultMusicConfig };
        this.loadConfig();
    }

    public static getInstance(): MusicConfigManager {
        if (!MusicConfigManager.instance) {
            MusicConfigManager.instance = new MusicConfigManager();
        }
        return MusicConfigManager.instance;
    }

    // 获取配置
    public getConfig(): MusicConfig {
        return this.config;
    }

    // 获取播放列表
    public getPlaylist(): MusicTrack[] {
        return this.config.playlist;
    }

    // 获取设置
    public getSettings() {
        return this.config.settings;
    }

    // 获取主题
    public getTheme() {
        return this.config.theme;
    }

    // 更新配置
    public updateConfig(newConfig: Partial<MusicConfig>): void {
        this.config = { ...this.config, ...newConfig };
        this.saveConfig();
    }

    // 添加歌曲到播放列表
    public addTrack(track: MusicTrack): void {
        this.config.playlist.push(track);
        this.saveConfig();
    }

    // 从播放列表移除歌曲
    public removeTrack(index: number): void {
        if (index >= 0 && index < this.config.playlist.length) {
            this.config.playlist.splice(index, 1);
            this.saveConfig();
        }
    }

    // 更新歌曲信息
    public updateTrack(index: number, track: Partial<MusicTrack>): void {
        if (index >= 0 && index < this.config.playlist.length) {
            this.config.playlist[index] = {
                ...this.config.playlist[index],
                ...track,
            };
            this.saveConfig();
        }
    }

    // 从本地存储加载配置
    private loadConfig(): void {
        if (typeof window !== "undefined") {
            try {
                const saved = localStorage.getItem("music-player-config");
                if (saved) {
                    const parsed = JSON.parse(saved);
                    this.config = { ...defaultMusicConfig, ...parsed };
                }
            } catch (error) {
                console.warn(
                    "Failed to load music config from localStorage:",
                    error,
                );
            }
        }
    }

    // 保存配置到本地存储
    private saveConfig(): void {
        if (typeof window !== "undefined") {
            try {
                localStorage.setItem(
                    "music-player-config",
                    JSON.stringify(this.config),
                );
            } catch (error) {
                console.warn(
                    "Failed to save music config to localStorage:",
                    error,
                );
            }
        }
    }

    // 重置为默认配置
    public resetToDefault(): void {
        this.config = { ...defaultMusicConfig };
        this.saveConfig();
    }

    // 导出配置
    public exportConfig(): string {
        return JSON.stringify(this.config, null, 2);
    }

    // 导入配置
    public importConfig(configJson: string): boolean {
        try {
            const imported = JSON.parse(configJson);
            // 验证配置格式
            if (imported.playlist && imported.settings && imported.theme) {
                this.config = { ...defaultMusicConfig, ...imported };
                this.saveConfig();
                return true;
            }
            return false;
        } catch (error) {
            console.error("Failed to import config:", error);
            return false;
        }
    }
}

// 导出配置管理器实例
export const musicConfig = MusicConfigManager.getInstance();
