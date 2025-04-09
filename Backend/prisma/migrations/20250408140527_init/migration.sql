-- CreateEnum
CREATE TYPE "EmployeeStatus" AS ENUM ('ACTIVE', 'ON_LEAVE', 'RESIGNED', 'TERMINATED');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "experience" TEXT,
    "salary" TEXT,
    "email" TEXT NOT NULL,
    "designation" TEXT,
    "department" TEXT,
    "employeeCode" TEXT,
    "status" "EmployeeStatus",
    "address" TEXT,
    "dob" TIMESTAMP(3),
    "profilePicture" TEXT,
    "reportingTo" INTEGER,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "duedate" TIMESTAMP(3) NOT NULL,
    "parentId" INTEGER,
    "assignTo" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "department" TEXT NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_assignTo_fkey" FOREIGN KEY ("assignTo") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
