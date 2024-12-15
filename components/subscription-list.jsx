"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updateSubscriptionStatus } from "@/app/actions/subscriptions";
import { useToast } from "@/hooks/use-toast";

/**
 * @typedef {Object} SubscriptionWithUserAndService
 * @property {string} id
 * @property {string} status
 * @property {Date} startDate
 * @property {Object} user
 * @property {string} user.name
 * @property {Object} service
 * @property {string} service.name
 */

/**
 * @param {{ subscriptions: SubscriptionWithUserAndService[] }} props
 */
export function SubscriptionList({ subscriptions }) {
  const [subs, setSubs] = useState(subscriptions);
  const { toast } = useToast();

  const handleUpdateStatus = async (subscriptionId, status) => {
    try {
      const result = await updateSubscriptionStatus({ subscriptionId, status });
      if (result.success) {
        setSubs(
          subs.map((sub) =>
            sub.id === subscriptionId ? { ...sub, status } : sub
          )
        );
        toast({
          title: "Subscription updated",
          description: `Subscription has been ${status.toLowerCase()}.`,
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update subscription. Please try again.",
        variant: "destructive",
      });
      console.log("Error in Subscription List: ", error);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subs.map((sub) => (
          <TableRow key={sub.id}>
            <TableCell>{sub.user.name}</TableCell>
            <TableCell>{sub.service.name}</TableCell>
            <TableCell>{sub.status}</TableCell>
            <TableCell>
              {new Date(sub.startDate).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {sub.status === "PENDING" && (
                <>
                  <Button
                    onClick={() => handleUpdateStatus(sub.id, "ACTIVE")}
                    className="mr-2"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleUpdateStatus(sub.id, "CANCELLED")}
                    variant="destructive"
                  >
                    Reject
                  </Button>
                </>
              )}
              {sub.status === "ACTIVE" && (
                <Button
                  onClick={() => handleUpdateStatus(sub.id, "INACTIVE")}
                  variant="secondary"
                >
                  Deactivate
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
