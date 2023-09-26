import React, { useEffect, useState, ReactElement, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import { InitialState, NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";

const NAVIGATION_STATE_KEY = `NAVIGATION_STATE_KEY-${Constants?.expoConfig?.sdkVersion}`;

export type FontSouce = Parameters<typeof Font.loadAsync>[0];
const usePromiseAll = (promises: Promise<void | void[]>[], cb: () => void) =>
  useEffect(() => {
    (async () => {
      await Promise.all(promises);
      cb();
    })();
  });

const useLoadAssets = (assets: number[], fonts: FontSouce): boolean => {
  const [ready, setReady] = useState(false);
  usePromiseAll(
    //@ts-ignore
    [Font.loadAsync(fonts), ...assets.map((asset) => Asset.loadAsync(asset))],
    () => setReady(true)
  );
  return ready;
};

interface LoadAssetsProps {
  fonts?: FontSouce;
  assets?: number[];
  children: ReactElement | ReactElement[];
}

SplashScreen.preventAutoHideAsync();

const LoadAssets = ({ assets, fonts, children }: LoadAssetsProps) => {
  const [isNavigationReady, setIsNavigationReady] = useState(!__DEV__);
  const [initialState, setInitialState] = useState<InitialState | undefined>();
  const ready = useLoadAssets(assets || [], fonts || {});

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(
          NAVIGATION_STATE_KEY
        );

        const state = savedStateString
          ? JSON.parse(savedStateString)
          : undefined;

        setInitialState(state);
      } finally {
        setIsNavigationReady(true);
      }
    };

    if (!isNavigationReady) {
      restoreState();
    }
  }, [isNavigationReady]);

  const onStateChange = useCallback(
    (state: any) =>
      AsyncStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state)),
    []
  );

  const onLayoutRootView = useCallback(async () => {
    if (ready || isNavigationReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [ready, isNavigationReady]);

  if (!ready || !isNavigationReady) {
    return null;
  }

  return (
    <NavigationContainer
      {...{ onStateChange, initialState }}
      onReady={onLayoutRootView}
    >
      <StatusBar style="light" />
      {children}
    </NavigationContainer>
  );
};

export default LoadAssets;
