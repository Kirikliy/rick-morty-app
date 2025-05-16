/**
 * Конфигурация переменных окружения
 */

export const ENV = {
  /**
   * Режим разработки
   */
  isDevelopment: import.meta.env.MODE === "development",

  /**
   * Режим продакшена
   */
  isProduction: import.meta.env.MODE === "production",

  /**
   * URL API
   */
  rmApiUrl:
    import.meta.env.VITE_RM_API_URL || "https://rickandmortyapi.com/api",
};

export default ENV;
