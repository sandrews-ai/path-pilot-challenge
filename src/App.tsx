import { useEffect, useCallback } from 'react';
import './App.css';
import DesktopNavigation from './navigation/DesktopNavigation';
import MobileNavigation from './navigation/MobileNavigation';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { setMobile } from './redux/reducers/appReducer';


function App() {
  const isMobile = useAppSelector(store => store.appState.isMobile);
  const dispatch = useAppDispatch();

  // Debounce resize handler to avoid excessive updates
  const handleWindowSizeChange = useCallback(() => {
    const shouldBeMobile = window.innerWidth <= 768;
    if (shouldBeMobile !== isMobile) {
      dispatch(setMobile(shouldBeMobile));
    }
  }, [isMobile, dispatch]);

  // Setup initial state
  useEffect(() => {
    dispatch(setMobile(window.innerWidth <= 768));
  }, [dispatch]);

  // Setup resize listener
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, [handleWindowSizeChange]);

  return (
    <div className="App">
      {!isMobile && <DesktopNavigation />}
      {isMobile && <MobileNavigation />}
    </div>
  );
}

export default App;