import { AccessManagementDialog } from "../dialogs/access-file-dialog";

interface UsersWithAccessListProps {
  isLoading: boolean;
  usersWithAccess: string[];
  unshareCallback: (username: string) => void;
}

export const UsersWithAccessList = ({
  isLoading,
  usersWithAccess,
  unshareCallback
}: UsersWithAccessListProps) => {
  return (
    <section>
      <h3 className="my-2 font-semibold">Users with access</h3>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-h-48 space-y-2 overflow-y-auto">
          {usersWithAccess.map((user) => (
            <AccessManagementDialog
              key={user}
              user={user}
              unshareCallback={() => unshareCallback(user)}
            />
          ))}
        </div>
      )}
    </section>
  );
};
