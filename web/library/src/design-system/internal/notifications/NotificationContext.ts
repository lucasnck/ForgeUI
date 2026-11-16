"use client";

import { createContext } from "react";
import type { ToastRegionContract } from "../../types/notifications";

export const NotificationContext = createContext<ToastRegionContract | null>(null);
