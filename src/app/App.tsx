import { FC } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { CharactersPage } from "@/pages/characters";
import { CharacterDetailsPage } from "@/pages/character-details";
import PAGES from "@/app/consts/pages";

const App: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path={PAGES.main} element={<CharactersPage />} />
            <Route
              path={PAGES.characters.view}
              element={<CharacterDetailsPage />}
            />
            <Route path="*" element={<Navigate to={PAGES.main} replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
