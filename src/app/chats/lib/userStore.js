import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  
  // Function to fetch user info from Firestore using the user's ID
  fetchUserInfo: async (id) => {
    if (!id) {
      console.warn("No user ID provided");
      return set({ currentUser: null, isLoading: false });
    }

    try {
      set({ isLoading: true }); // Set loading state to true

      // Ensure the ID is a string before passing it to `doc`
      const docRef = doc(db, "users", id.toString());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log("User data fetched from Firestore:", userData);

        // Update the Zustand store with the fetched user data
        set({ currentUser: userData, isLoading: false });
      } else {
        console.warn("User not found in Firestore for ID:", id);
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.error("Error fetching user info from Firestore:", err);
      set({ currentUser: null, isLoading: false });
    }
  },

  // Optional reset function to clear the current user and loading state
  resetUser: () => set({ currentUser: null, isLoading: false }),
}));
