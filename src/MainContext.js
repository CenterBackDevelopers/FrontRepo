import { createContext, useContext, useEffect, useState } from "react";

// 웹 스토리지로 공용 설정값을 저장할 컨텍스트
const MainContext = createContext();

export function MainProvider({ children }) {
  const [theme, setTheme] = useState(undefined);

  // State 초기화
  useEffect(() => {
    // localStorage에 theme 값이 있으면 반영, 없으면 white
    const localTheme = localStorage.getItem("theme");
    console.log(localTheme);
    if (localTheme) setTheme(localTheme);
    else setTheme("white");
  }, []);

  // theme의 값이 변경되면 values에 반영
  useEffect(() => {
    if (theme !== undefined) {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <MainContext.Provider value={{ theme, setTheme }}>
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

  return context.setTheme;
}
