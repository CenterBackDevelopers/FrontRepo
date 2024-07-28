import { createContext, useContext, useEffect, useState } from "react";

// 웹 스토리지로 공용 설정값을 저장할 컨텍스트
const MainContext = createContext();

export function MainProvider({ children }) {
  // 테마는 white 혹은 dark 값을 지님
  const [theme, setTheme] = useState("white");

  const saveTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    const themeStorage = localStorage.getItem("theme");

    if (themeStorage) {
      setTheme(themeStorage);
    }
  }, [theme]);

  return (
    <MainContext.Provider value={{ theme, saveTheme }}>
      {children}
    </MainContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(MainContext);

  if (!context)
    throw new Error("useTheme()은 반드시 MainProvider 안에서 사용해야 합니다");

  return context.theme;
}

export function useSetTheme() {
  const context = useContext(MainContext);

  if (!context)
    throw new Error("useTheme()은 반드시 MainProvider 안에서 사용해야 합니다");

  return context.saveTheme;
}