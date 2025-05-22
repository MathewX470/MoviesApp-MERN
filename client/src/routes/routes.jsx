import HomePage from "../pages/HomePage";
import PersonDetail from "../pages/PersonDetail";
import favoriteList from "../pages/FavoriteList";
import MediaDetail from "../pages/MediaDetail";
import MediaList from "../pages/MediaList";
import mediaSearch from "../pages/MediaSearch";
import passwordUpdate from "../pages/PasswordUpdate";
import reviewList from "../pages/ReviewList";
import ProtectedPage from "../components/common/ProtectedPage";

export const routesGen = {
  home: "/",
  mediaList: (type) => `${type}`,
  mediaDetail: (type, id) => `/${type}/${id}`,
  mediaSearch: "/search",
  person: (id) => `/person/${id}`,
  favoriteList: "/favorites",
  reviewList: "/reviews",
  passwordUpdate: "update-password",
};

const routes = [
  {
    index: true,
    element: <HomePage />,
    state: "home",
  },
  {
    path: "/person/:personId",
    element: <PersonDetail />,
    state: "person.detail",
  },
  {
    path: "/search",
    element: <mediaSearch />,
    state: "search",
  },
  {
    path: "/password-update",
    element:(
        <ProtectedPage>
            <passwordUpdate />
        </ProtectedPage>
    ),
    state: "password.update",
  },
  {
    path: "/favorites",
    element:(
        <ProtectedPage>
            <favoriteList />
        </ProtectedPage>
    ),
    state: "favorite.list",
  },
  {
    path: "/reviews",
    element:(
        <ProtectedPage>
            <reviewList />
        </ProtectedPage>
    ),
    state: "reviews",
  },
  {
    path: "/:mediaType",
    element: <MediaList />
  },
  {
    path: "/:mediaType/:mediaId",
    element: <MediaDetail />
  }
];

export default routes;
